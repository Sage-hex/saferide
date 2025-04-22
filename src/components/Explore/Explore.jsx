import BlackBtn from "../Button/BlackBtn/BlackBtn"
import Request from "../RequestBtn/Request"
import "./Explore.css"

const Explore = () => {
  return (
    <main className="explore-container">
        <Request/>
        <section className="explore-items">
        <article className="explore-details">
            <h2>Request in seconds, ride
            safe in minutes</h2>
            <p>Available at everywhere in Nigeria</p>
            <BlackBtn>Explore now</BlackBtn>
        </article>

        </section>


    </main>
  )
}

export default Explore
