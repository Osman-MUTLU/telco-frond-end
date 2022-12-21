// get result data from session storage and and parse json

export const getResultData = () => {
    const result = sessionStorage.getItem('result')
    return JSON.parse(result)
}

// set result data to session storage and stringify json

export const setResultData = (data) => {
    sessionStorage.setItem('result', JSON.stringify(data))
}

export const getQuestionsData = () => {
    const result = sessionStorage.getItem('questions')
    return JSON.parse(result)
}

export const setQuestionsData = (data) => {
    sessionStorage.setItem('questions', JSON.stringify(data))
}
