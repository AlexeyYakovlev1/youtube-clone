import { setVideos } from "../redux/actions"

export const addVideo = (event, setMessage, setLoading) => {
    return dispatch => {
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
    
            reader.onload = () => {
                const result = reader.result;
                const type = file.name.split(".")[file.name.split(".").length-1];
                const allowedTypes = ["mp4", "mpeg", "avi", "mkv", "mpg", "mov"];
    
                if (!allowedTypes.includes(type)) {
                    return setMessage({
                        text: "Данный тип файла не поддерживается",
                        type: "error"
                    })
                }
    
                const obj = {
                    basicInfo: {
                        name: file.name,
                        size: file.size
                    },
                    src: result
                }
    
                dispatch(setVideos(obj));
                setMessage({
                    text: "Видео добавлено к вам на аккаунт",
                    type: "success"
                })
                setLoading(false);
            }
        } catch(e) {
            setLoading(false);
            setMessage({
                text: e.message,
                type: "error"
            })
        }
    }
} 