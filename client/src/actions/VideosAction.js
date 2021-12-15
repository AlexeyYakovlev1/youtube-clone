import { setVideos } from "../redux/actions";

export const getFile = (event, setMessage, setLoading, setCurrentVideo) => {
    try {
        if (!event.target.files.length) return;
        setLoading(true);
        const file = Array.from(event.target.files)[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        
        reader.onerror = () => {
            return setMessage({
                text: reader.error,
                type: "error"
            })
        }

        reader.onload = async() => {
            const result = reader.result;
            const type = file.name.split(".")[file.name.split(".").length-1];
            const allowedTypes = ["mp4", "mpeg", "avi", "mkv", "mpg", "mov"];

            if (!allowedTypes.includes(type)) {
                return setMessage({
                    text: "Данный тип файла не поддерживается",
                    type: "error"
                })
            }

            setCurrentVideo({
                url: result, status: true
            });
        }
    } catch(e) {
        setLoading(false);
        setMessage({
            text: e.message,
            type: "error"
        })
    }
}

export const addVideo = (info, token, setMessage, setLoading) => {
    return async dispatch => {
        try {
            const response = await fetch("/api/videos/add", {
                method: "POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            response.json().then(data => {
                setLoading(false);
                if (response.ok) {
                    dispatch(setVideos(info));
                    setMessage({
                        text: "Видео опубликовано",
                        type: "success"
                    })
                } else {
                    setMessage({
                        text: data.message,
                        type: "error"
                    })  
                }
            })
        } catch(e) {
            setLoading(false);
            setMessage({
                text: e.message,
                type: "error"
            })
        }
    }
} 