import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

interface Props {
    accepted: number;
    disabled: boolean;
}

const UploadContainer = styled("div")<Props>(
    ({ theme, accepted, disabled }) => {
        const getColor = () => {
            switch (true) {
                case Boolean(accepted):
                    return "green";
                case disabled:
                    return grey[600];
                default:
                    return theme.palette.primary.main;
            }
        };

        return {
            color: getColor(),
            borderColor: getColor(),
            cursor: "pointer",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 20px",
            borderWidth: "1px",
            borderRadius: "8px",
            borderStyle: accepted ? "dashed" : "solid",
            outline: "none",
            transition: "border 0.24s ease-in-out"
        };
    }
);

export default UploadContainer;
