import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../Providers/Auth'
import { getUserData } from './APIServices/UserApiServices'

const UserManagerWrapper = styled.div`
    display: flex;
    padding-top: 120px;
    padding-bottom: 20px;
    min-height: calc(100vh - 141px - 130.33px);
    justify-content: center;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 1rem;

`

const ProfileManager = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 2rem;
`

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  object-fit: cover;
  object-position: top;
  border: 2px solid #ccc;
`

const Name = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
`

const Line = styled.span`

`

const CommentsWrapper = styled.div`

`

const Comments = styled.p`
    
`

export default function UserManager() {

    const { user, setUser } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [avatarURL, setAvatarURL] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getUserData(user.username)
            console.log(resp)
            setUsername(resp.data.username)
            setEmail(resp.data.email)
            setDisplayName(resp.data.displayName)
            setAvatarURL(resp.data.avatarURL)
        }
        fetchData()
    }, [])

    return (
        <UserManagerWrapper>
            <Container>
                <ProfileManager>
                    <Avatar src={avatarURL ? `http://localhost:13233/ClothStore/cloth-images${avatarURL}` : './images/MissingAvatar.jpg'}/>
                    <Name>{displayName}</Name>
                    <Line>{username}</Line>
                    <Line>{email}</Line>
                    <Line>{user.userAccess}</Line>
                </ProfileManager>
                <CommentsWrapper>
                    <Comments>

                    </Comments>
                </CommentsWrapper>
            </Container>
        </UserManagerWrapper>
    )
}
