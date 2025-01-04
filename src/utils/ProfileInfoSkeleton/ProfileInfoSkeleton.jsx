import style from '../../components/Profile/ProfileInfo.module.css';
export default function ProfileInfoSkeleton() {

    return (
        <div className={style.profileInfoContainer}>
            <div className={style.picB}
                 style={{background: "grey"}}></div>
            <div className={style.profilePic}
                 style={{background: "grey"}}>
            </div>
            <div className={style.profileInfo}>
                <div className={style.profileInfoTop}>
                    <p className={style.profileInfoName}>Loading...</p>
                </div>
                <div className={style.statusContainer}>
                    <h4>Loading...</h4>
                </div>
            </div>
        </div>
    )
}
