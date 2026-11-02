// "use client";

// import { useFormik } from "formik";
// import axiosConfig from "../utils/axiosConfig";

// import React from "react";

// import styles from "./styles.module.css";

// import { MatrixRain } from "../../components/MatrixRain/MatrixRain";
// import { useRouter } from "next/navigation";
// import Link from "next/link";



// const page = () => {
//   const router=useRouter()
//   if (localStorage.getItem("token") !== null) {
//     router.push("/study")
//   }

//   const formik = useFormik({
//     initialValues: {
//       login: "",
//       password: "",
//     },
//     onSubmit: async (values) => {
//       const formData = {
//         username: values.login,
//         password: values.password,
//       };
//       const formdata2 = new FormData();
//       formdata2.set("username", values.login);
//       formdata2.set("password", values.password);
//       const response = await axiosConfig(1).post("api/users/auth/", formdata2);
//       if ("data" in response) {
//         const data = response.data;
//         console.log(data.auth_token);
//         localStorage.setItem("token", data.auth_token);
//       }
//     },
//   });
//   return (
//     <>
//       <MatrixRain></MatrixRain>
//       <div className={styles.blockLoginUser}>
//         <h3 className={styles.textAuth}>Авторизация</h3>
//         <div className={styles.blockFormLogin}>
//           <form onSubmit={formik.handleSubmit}>
//             <br />
//             <>
//               <label htmlFor="textArea" className={styles.labelAuth}>
//                 Почта
//               </label>
//               <br />
//               <input
//                 type="email"
//                 name="username"
//                 id="textArea"
//                 className="login"
//                 maxLength={254}
//                 required=""
//                 value={formik.values.login}
//                 onChange={(e) => formik.setFieldValue("login", e.target.value)}
//               />
//               <br />
//               <label htmlFor="textArea2" className={styles.labelAuth}>
//                 Пароль
//               </label>
//               <br />
//               <input
//                 type="password"
//                 name="password"
//                 cols={40}
//                 rows={6}
//                 id="textArea2"
//                 className="password"
//                 required=""
//                 value={formik.values.password}
//                 onChange={(e) =>
//                   formik.setFieldValue("password", e.target.value)
//                 }
//               />
//               <p />
//             </>
//             {/* {f}
//           <p>{f.errors}</p> */}
//             <button className={styles.btnLogin} type="submit">
//               Войти
//             </button>
//           </form>
//           <div>{/* <p>{error}</p> */}</div>
//           <div className={styles.blockWithTextRegAcc}>
//             <p className={styles.textCreateAcc}>
//               Ещё нет аккаунта?
//               <br /> Создай его, нажав на ссылку ниже
//             </p>
//             <Link href={"/RegistrPage"} className={styles.smallText}>
//               <small>Зарегестрировать аккаунт</small>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
