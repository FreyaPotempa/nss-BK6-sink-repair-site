import { getRequests, deleteRequest, getPlumbers, sendRequest, saveCompletion, getCompletions  } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "click",
    click => {
        if (click.target.id.startsWith("request--")) {
            const [,requestId] = click.target.id.split("--")
            deleteRequest(parseInt(requestId))
        }
    }
)

export const Requests = () => {
    const pastRequests = getRequests()
    const completedWork = getCompletions()
    //NEXT: sort requests before completions
    const sortedRequests = pastRequests.sort((a, b) => {
        if (completedWork.find(complete => parseInt(complete.requestId) === a.id)) {
            return 1
        }
        return -1
    })

     let html = `<ul>`
    const serviceRequestList = sortedRequests.map(request => convertRequestToListElement(request))
    
    html+= serviceRequestList.join("")
    html += "</ul>"

        return html
}
/*
const convertCompletionToListElement = (completed) => {
${completedRequests.map(convertCompletionToListElement).join("")}
}
*/

const convertRequestToListElement = (request) => {
    let html = `<li>
    ${request.description}
    ${isWorkComplete(request)}
    <button class="request__delete"
    id="request--${request.id}">
    Delete</button>
    </li>`
    
    return html

}

const isWorkComplete = (request) => {
    const completedRequests = getCompletions()
    const plumbers = getPlumbers()
    let html = ``
    if (completedRequests.find(complete => parseInt(complete.requestId) === request.id)) {
      return html
    } else {
        return html += `<select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${plumbers.map(plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }).join("")
        }
    </select>`
    }
}
    /* function that will match completion table to requests table and if match is found
    then changes the html to simply list the description with no options 
    for loop needs to go within Requests() function for scope */
    /*need to iterate through requests to pull the description*/

    



mainContainer.addEventListener(
    "change", (event) => {
        if (event.target.id === "plumbers") {
            const [requestId,plumberId] = event.target.value.split("--")
            /*
            This object should have 3 properties
                1. requestId
                2. plumberId
                3. date_created
                */

            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: Date.now()
            }

            saveCompletion(completion)
    }
})