import { fetchRequests, fetchPlumbers, fetchCompletion } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => fetchCompletion())
    .then(
        () => {
    mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()
