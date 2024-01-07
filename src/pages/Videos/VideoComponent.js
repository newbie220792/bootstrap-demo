import styles from './video.module.css';
import { videos } from './videoCommon';
export const VideoComponent = () => {
    return (
        <div className={`row p-5`}>
            {videos.map((v) => {
                return (
                    <div className={`col-2 mb-4 ${styles.video}`} key={v.id}>
                        <iframe
                            src={v.url}
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                            title={v.title}
                        />
                    </div>
                );
            })}
        </div>
    );
};
