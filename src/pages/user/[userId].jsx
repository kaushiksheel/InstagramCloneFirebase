import React from 'react'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Posts } from '@/components/Posts'
import { UserDetails } from '@/components/UserDetails'
import { useUserPosts } from '@/hooks/useUserPosts'
import { useRouter } from 'next/router'
import { EditProfileModal } from '@/components/EditProfileModal'
import { useState } from 'react'




function Profile() {
  const [openModal, setOpenModal] = useState(false);

const router=useRouter()

const userId=router.asPath.split('/')[2]

const {posts}=useUserPosts(userId)


const handleOpenModal = () => setOpenModal(true);

const handleCloseModal = () => setOpenModal(false);

  return (
    <>
    <Header/>
    <main className='main'>
        <Container>
            <UserDetails openModal={handleOpenModal}  postCount={posts?.length}/>
            <Posts posts={posts}/>
        </Container>
        <EditProfileModal openModal={openModal} closeModal={handleCloseModal}/>
    </main>
    </>
  )
}

export default Profile