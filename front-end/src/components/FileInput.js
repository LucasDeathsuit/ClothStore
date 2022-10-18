import React from 'react'
import styled from 'styled-components'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const FileInputContainer = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3% 0;
    width: 150px;   
    border: 2px solid #c1c1c1;
    border-radius: 5px;
`

const Label = styled.label`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ImageName = styled.span`
    margin: 8px;
    font-weight: 500;
    color: #355c7D;
`

const Input = styled.input`
    display: none;
`

export default function FileInput({ fileName, name, onChange, accept }) {
    return (
        <FileInputContainer>
            <Label htmlFor='fileInput'> <AddAPhotoIcon fontSize='large' />
                <Input id='fileInput' type="file" name={name} onChange={onChange} accept={accept} />
                {fileName ? fileName : 'Select Image'}
            </Label>
        </FileInputContainer>
    )
}
