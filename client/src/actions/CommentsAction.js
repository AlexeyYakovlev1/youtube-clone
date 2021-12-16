export const addComment = async(info, videoId, token, setMessage) => {
    try {
        const response = await fetch(`/api/comments/add/${videoId}`, {
            method: "POST",
            body: JSON.stringify({text: info}),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        response.json().then(data => {
            if (!response.ok) {
                return setMessage({
                    text: data.message,
                    type: "error"
                })
            }

            setMessage({
                text: data.message,
                type: "success"
            })
        })
    } catch(e) {
        console.log(e);
        setMessage({
            text: e.message,
            type: "error"
        })
    }
}