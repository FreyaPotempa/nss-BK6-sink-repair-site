const applicationState = {
requests: [],
plumbers: [],
complettions: []
}
const mainContainer = document.querySelector("#container")
const API = "https://walrus-app-wl86i.ondigitalocean.app"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const getRequests = () => {
        return applicationState.requests.map(request => ({...request}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
       
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
    .then(response => response.json())
    .then(
        (data) => {
            applicationState.plumbers = data
        }
    )
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const saveCompletion = (complete) => {
    /*
    will perform the POST request to save completion
    object to the API
    */
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(complete)
    }
       
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const fetchCompletion = () => {
    /*
    will retrieve all completion objects from the API
    */
   return fetch(`${API}/completions`)
   .then(response => response.json())
   .then(
    (completion) => {
        applicationState.completions = completion
    }
   )
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}