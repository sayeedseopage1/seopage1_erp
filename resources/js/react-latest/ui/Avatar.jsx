import React from "react";

const Avatar = ({
    type = "square",
    width = 32,
    height = 32,
    className,
    src,
    alt,
    name,
    fontSize = "2rem",
}) => {
    const ref = React.useRef(null);

    let modifiedName = name?.slice(0, 1).toUpperCase();

    React.useLayoutEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!src) {
            // Draw a background for the avatar with the first letter of the name
            ctx.fillStyle = "#ECECEC";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `600 ${fontSize} sans-serif`;
            ctx.fillStyle = "#4A4A4A";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // Calculate the height of the text based on the font size
            const textHeight = parseInt(fontSize, 12);

            // Calculate the vertical position to align the text's baseline to the center
            const yOffset = canvas.height / 2 + textHeight / 2;

            ctx.fillText(modifiedName, canvas.width / 2, yOffset);
        } else {
            const avatar = new Image();
            avatar.src = src;
            avatar.onload = () => {
                const aspectRatio = avatar.width / avatar.height;

                // Calculate the dimensions to fit the image within the canvas while preserving its aspect ratio
                let drawWidth, drawHeight;

                if (aspectRatio > 1) {
                    // Landscape image
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / aspectRatio;
                } else {
                    // Portrait image
                    drawWidth = canvas.height * aspectRatio;
                    drawHeight = canvas.height;
                }

                // Calculate the position to center the image within the canvas
                const xOffset = (canvas.width - drawWidth) / 2;
                const yOffset = (canvas.height - drawHeight) / 2;

                ctx.drawImage(avatar, xOffset, yOffset, drawWidth, drawHeight);
            };
        }
    }, [src, modifiedName, fontSize, width, height]); // Include width and height in the dependency array

    return (
        <div
            style={{
                width: `${width}px`,
                minWidth: `${width}px`,
                height: `${height}px`,
                overflow: "hidden",
                borderRadius: type === "circle" ? "50%" : "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <canvas
                ref={ref}
                width={width * 2}
                height={height * 2}
                style={{ width: `${width}px`, height: `${height}px` }}
            />
        </div>
    );
};

export default Avatar;
