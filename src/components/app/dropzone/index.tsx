import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, InputLabel } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadContainer from "./UploadContainer";

interface IFile extends File {
    preview: string
    path: string
    lastModified: number
    lastModifiedDate: string | Date
    name: string
    size: number
    type: string
    webkitRelativePath: string
}

interface Props {
    isEditMode?: boolean
    value?: string
    name: string
    error?: boolean
    label: string
    disabled?: boolean
    onChange: (item: Buffer | IFile) => void
}

function Dropzone({ isEditMode = false, onChange, disabled = false, label, error }: Props) {

    const [files, setFiles] = useState<readonly IFile[]>([]);
    const onDrop = useCallback((acceptedFiles: IFile[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                onChange && typeof onChange === 'function' && onChange(file);
            };
            reader.readAsArrayBuffer(file);
        });

        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const { getRootProps, getInputProps, isDragAccept, } = useDropzone({
        onDrop: onDrop as any,
        disabled
    });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    if (error) {
        return (
            <UploadContainer
                {...getRootProps({
                    accepted: +isDragAccept,
                    disabled: disabled ? disabled : !isEditMode
                })}
            >
                <input {...getInputProps()} />
                <InputLabel>
                    {"Error white it tried to upload the file or image"}
                </InputLabel>
            </UploadContainer>
        )
    }

    return (
        <UploadContainer
            {...getRootProps({
                accepted: +isDragAccept,
                disabled: disabled ? disabled : !isEditMode
            })}
        >
            <input {...getInputProps()} />
            <InputLabel>
                <Box style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <CameraAltIcon style={{ marginRight: 15 }} />
                    <span
                        style={{
                            fontFamily: "proxima-nova, ProximaNova, GESS, GE-SS, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                            fontSize: ".9em"
                        }}
                    >
                        {label || "Drag 'n' drop some files here, or click to select files"}
                    </span>
                </Box>
            </InputLabel>
        </UploadContainer>
    )
}

export default Dropzone