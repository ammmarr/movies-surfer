import react, { useState } from "react"
import apiConfig from "../../api/MovieApi/apiConfig"
import { Cast, CastData } from "../../api/MovieApi/interfaces"
import "../../styles/castCard.scss"
import failedImage from "../../assets/person.png"


export default function CastCard(props: Cast) {
    const [image, setImage] = useState(apiConfig.originalImage(props.castData.profile_path))
    const actorData = props.castData
    const sucssesImg = apiConfig.originalImage(actorData.profile_path)
    const failedImg = failedImage
    const onError = () => setImage(failedImage)
    return (
        <div className="cast-card" style={{ background: `url(${failedImage})` }} key={props.id}>
            <img src={image ? image : failedImage} onError={onError} />
            <h3>{actorData.name}</h3>
        </div>
    )
}