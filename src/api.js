const baseUrl = "api.pajthy.akarasz.me"
const httpBaseUri = "https://" + baseUrl

export const api = {

  createSession: (choices, onSuccess) => (
    fetch(httpBaseUri, {
      method: "POST",
      body: JSON.stringify(choices),
    })
    .then(res => {
      console.log("res was", res)
      if (res.status === 201) {
        onSuccess(res.headers.get("location"))
      } else {
        throw res
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })),

  choices: (sessionId, onSuccess) => (
    fetch(httpBaseUri + "/" + sessionId, {
      method: "GET",
    })
    .then(res => Promise.all([res.status, res.json()]))
    .then(([code, body]) => {
      if (code === 200) {
        onSuccess(body)
      } else {
        throw (code, body)
      }
    })),

  vote: (sessionId, name, choice, onSuccess) => (
  fetch(httpBaseUri + "/" + sessionId, {
    method: "PUT",
    body: JSON.stringify({Participant: name, Choice: choice}),
  })
  .then(res => {
    if (res.status === 202) {
      onSuccess()
    } else {
      throw res
    }
  })),

  getSession: (sessionId, onSuccess) => (
    fetch(httpBaseUri + "/" + sessionId + "/control", {
      method: "GET",
    })
    .then(res => Promise.all([res.status, res.json()]))
    .then(([code, body]) => {
      if (code === 200) {
        onSuccess(body)
      } else {
        throw (code, body)
      }
    })),

  startVote: (sessionId, onSuccess) => (
    fetch(httpBaseUri + "/" + sessionId + "/control/start", {
      method: "PATCH",
    })
    .then(res => {
      if (res.status === 202) {
        onSuccess()
      } else {
        throw res
      }
    })),

  stopVote: (sessionId, onSuccess) => (
    fetch(httpBaseUri + "/" + sessionId + "/control/stop", {
      method: "PATCH",
    })
    .then(res => {
      if (res.status === 202) {
        onSuccess()
      } else {
        throw res
      }
    })),

  resetVote: (sessionId, onSuccess) => (
    fetch(httpBaseUri + "/" + sessionId + "/control/reset", {
      method: "PATCH",
    })
    .then(res => {
      if (res.status === 202) {
        onSuccess()
      } else {
        throw res
      }
    })),

  kickParticipant: (sessionId, name, onSuccess) => (
    fetch(httpBaseUri + "/" + sessionId + "/control/kick", {
      method: "PATCH",
      body: name,
    })
    .then(res => {
      if (res.status === 204) {
        onSuccess()
      } else {
        throw res
      }
    })),

  join: (sessionId, name, onSuccess, onAlreadyJoined) => (
    fetch(httpBaseUri + "/" + sessionId + "/join", {
      method: "PUT",
      body: name,
    })
    .then(res => {
      if (res.status === 201) {
        onSuccess()
      } else if (res.status === 409) {
        onAlreadyJoined()
      } else {
        throw res
      }
    })),
}
