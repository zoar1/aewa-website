"use client";

export default function VideoSection() {
    return (
        <div
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                height: "50vh",
                overflow: "hidden",
            }}
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                }}
            >
                <source src="/images/video/rotating-abstract.mp4" type="video/mp4" />
                <source src="/images/video/rotating-abstract.webm" type="video/webm" />
            </video>
        </div>
    );
}
