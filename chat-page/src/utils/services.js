export const baseUrl = "http://localhost:5500/api"


export const posRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })
    const data = await response.json();
    if (!response.ok) {
        let message
        if (data?.message) {
            message = data.message
        } else {
            message = data;
        }

        return { error: true, message }
    }
    return data
}

export const getRequest = async (url) => {
    const response = await fetch(url)

    const data = await response.json();

    if (!response.ok) {
        let message = "An error occured"

        if (data?.message) {
            message = data.message
        }

        return { error: true, message }
    }

    return data;
}