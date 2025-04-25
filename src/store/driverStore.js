import { create } from 'zustand';
import { auth, db } from '../firebase'; // Adjust path as needed
import { collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';

const useDriverStore = create((set, get) => ({
  isAvailable: false,
  currentRideRequest: null,
  currentTrip: null,
  tripHistory: [],
  earnings: { today: 0, week: 0, total: 0 },
  notifications: [],
  driverProfile: null,
  loadingRequests: false,
  loadingHistory: false,
  error: null,

  setAvailability: async (available) => {
    set({ isAvailable: available });
    if (auth.currentUser) {
      const driverRef = doc(db, 'drivers', auth.currentUser.uid);
      try {
        await updateDoc(driverRef, { isAvailable: available });
      } catch (error) {
        console.error('Error updating availability:', error);
        set({ error: 'Failed to update availability.' });
      }
    }
  },

  fetchRideRequests: () => {
    set({ loadingRequests: true, error: null, currentRideRequest: null });
    if (auth.currentUser && get().isAvailable) {
      const requestsQuery = query(
        collection(db, 'rideRequests'),
        where('status', '==', 'pending'),
        // Add other criteria like proximity if needed
      );

      return onSnapshot(requestsQuery, (snapshot) => {
        if (!snapshot.empty) {
          const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // For simplicity, we'll just take the first one. Implement sorting/priority as needed.
          set({ currentRideRequest: requests[0], loadingRequests: false });
        } else {
          set({ currentRideRequest: null, loadingRequests: false });
        }
      }, (error) => {
        console.error('Error fetching ride requests:', error);
        set({ error: 'Failed to fetch ride requests.', loadingRequests: false });
      });
    } else {
      set({ currentRideRequest: null, loadingRequests: false });
      return () => {}; // Return an empty unsubscribe function
    }
  },

  acceptRideRequest: async (requestId) => {
    if (auth.currentUser && requestId) {
      const requestRef = doc(db, 'rideRequests', requestId);
      const driverRef = doc(db, 'drivers', auth.currentUser.uid);
      try {
        await updateDoc(requestRef, { status: 'accepted', driverId: auth.currentUser.uid });
        const requestSnap = await getDoc(requestRef);
        if (requestSnap.exists()) {
          set({ currentRideRequest: null, currentTrip: requestSnap.data() });
          // Update driver's isAvailable status to false
          await updateDoc(driverRef, { isAvailable: false });
          set({ isAvailable: false });
        }
      } catch (error) {
        console.error('Error accepting ride request:', error);
        set({ error: 'Failed to accept ride request.' });
      }
    }
  },

  rejectRideRequest: async (requestId) => {
    if (requestId) {
      const requestRef = doc(db, 'rideRequests', requestId);
      try {
        await updateDoc(requestRef, { status: 'rejected' });
        set({ currentRideRequest: null });
      } catch (error) {
        console.error('Error rejecting ride request:', error);
        set({ error: 'Failed to reject ride request.' });
      }
    }
  },

  fetchCurrentTrip: () => {
    // Logic to fetch the driver's current ongoing trip
    // This might involve querying a 'trips' collection where driverId matches and status is 'ongoing'
    // For simplicity, we'll assume this data is updated elsewhere after accepting a ride.
  },

  fetchTripHistory: () => {
    set({ loadingHistory: true, error: null, tripHistory: [] });
    if (auth.currentUser) {
      const historyQuery = query(
        collection(db, 'trips'),
        where('driverId', '==', auth.currentUser.uid),
        where('status', '==', 'completed'),
        // Add order by timestamp
      );
      return onSnapshot(historyQuery, (snapshot) => {
        const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ tripHistory: history, loadingHistory: false });
      }, (error) => {
        console.error('Error fetching trip history:', error);
        set({ error: 'Failed to fetch trip history.', loadingHistory: false });
      });
    } else {
      set({ tripHistory: [], loadingHistory: false });
      return () => {};
    }
  },

  fetchEarnings: () => {
    // Logic to calculate and fetch earnings from your backend or Firestore
    // This will depend on how you store and track earnings data.
    set({ earnings: { today: Math.random() * 50, week: Math.random() * 200, total: Math.random() * 1000 } }); // Placeholder
  },

  fetchNotifications: () => {
    // Logic to fetch notifications for the driver
    set({ notifications: [{ id: 1, message: 'New ride request!', timestamp: new Date() }] }); // Placeholder
  },

  fetchDriverProfile: async () => {
    if (auth.currentUser) {
      const driverRef = doc(db, 'drivers', auth.currentUser.uid);
      const snap = await getDoc(driverRef);
      if (snap.exists()) {
        set({ driverProfile: snap.data() });
      }
    }
  },

  // Initialize all data fetching
  initializeDashboard: () => {
    get().fetchDriverProfile();
    get().fetchEarnings();
    get().fetchNotifications();
    return [get().fetchRideRequests(), get().fetchTripHistory()]; // Return unsubscribe functions
  },

  resetDashboard: () => {
    set({
      isAvailable: false,
      currentRideRequest: null,
      currentTrip: null,
      tripHistory: [],
      earnings: { today: 0, week: 0, total: 0 },
      notifications: [],
      driverProfile: null,
      loadingRequests: false,
      loadingHistory: false,
      error: null,
    });
  },
}));

export default useDriverStore;