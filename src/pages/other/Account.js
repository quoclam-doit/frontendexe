import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import styles from '../pages/Account.module.css'
import * as Yup from 'yup'
import Footer from './Footer'
import { useFormik } from 'formik'
import { useRef } from 'react'

function Accounts() {
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

  const [image, setImage] = useState('')
  const [profile, setProfile] = useState({})
  const baseURL = 'https://6476f6b89233e82dd53a99bf.mockapi.io/user'
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userLogin'))
    if (user) {
      setProfile(user)
    }
  }, [])

  const submitImage = () => {
    if (!image) return
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'toadtrade')
    data.append('cloud_name', 'dilykkog3')

    fetch('https://api.cloudinary.com/v1_1/dilykkog3/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        editAccount.setFieldValue('img', data.secure_url) // Set the image URL in the formik values
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [avatar, setAvatar] = useState([])
  const url = 'https://6476f6b89233e82dd53a99bf.mockapi.io/user'
  useEffect(() => {
    getAccount()
  }, [])

  function getAccount() {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        const loggedInUser = data.find(
          (user) => user.username === profile.username
        )
        if (loggedInUser) {
          setAvatar([loggedInUser])
        } else {
          setAvatar([])
        }
      })
      .catch((error) => console.log(error.message))
  }

  const editAccount = useFormik({
    initialValues: {
      name: '',
      img: '',
      phonenumber: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'Tên phải tối thiểu 5 ký tự')
        .max(25, 'Tên phải dưới 25 ký tự')
        .required('Không được để trống ô này'),
      img: Yup.string().required('Bạn phải tải ảnh lên'),
      phonenumber: Yup.string()
        .required()
        .matches(phoneRegExp, 'Số điện thoại này không tồn tại'),
    }),
    onSubmit: async (values) => {
      try {
        await submitImage()

        const editAccountResponse = await fetch(baseURL, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        })
if (!editAccountResponse.ok) {
          throw new Error(`HTTP Status: ${editAccountResponse.status}`)
        }
      } catch (error) {
        console.log(error.message)
      }
    },
  })

  return (
    <>
      <Navbar />
      <div className={styles.center}>
        <form>
          <div
            className={styles.txtField}
            style={{ display: 'flex', justifyContent: 'center', border: 0 }}
          >
            <div className={styles.avatar}>
              <img src={profile.img} alt="" />
            </div>
          </div>

          <div className={styles.txtField}>
            <input
              type="text"
              value={profile.username}
              name="username"
              disabled
            />
            <span></span>
          </div>
          {/* Name */}
          <div className={styles.txtField}>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={editAccount.handleChange}
            />
            {console.log(profile.name)}
            <span></span>
            <label>Họ và Tên</label>
            {editAccount.errors.name && editAccount.touched.name && (
              <p style={{ color: 'red' }}>{editAccount.errors.name}</p>
            )}
          </div>

          <div className={styles.txtField}>
            <input
              type="text"
              name="phonenumber"
              maxLength={10}
              pattern="[0-9]*"
              // placeholder="Type your year of birth"
              value={profile.phonenumber}
              onChange={editAccount.handleChange}
            />
            <span></span>
            <label>Số điện thoại</label>
            {editAccount.errors.phonenumber &&
              editAccount.touched.phonenumber && (
                <p style={{ color: 'red' }}>{editAccount.errors.phonenumber}</p>
              )}
          </div>
        </form>
        ;
      </div>
      <Footer />
    </>
  )
}

export default Accounts