// "use client";

// import { useFormik } from "formik";
// import React from "react";

// import styles from "./styles.module.css"

// import { MatrixRain } from "../../components/MatrixRain/MatrixRain";
// import axiosConfig from "../../app/utils/axiosConfig";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React from "react";

// const page = () => {
//   const router=useRouter()
//   if (localStorage.getItem("token") !== null) {
//     router.push("/study");
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
//         email: values.login,
//       };
//       const formdata2 = new FormData();
//       formdata2.set("username", "Пользователь");
//       formdata2.set("password", values.password);
//       formdata2.set("email", values.login);
//       const response = await axiosConfig(1).post(
//         "api/users/register/",
//         formData,
//         { headers: { ContentType: "application/json" } }
//       );
//     },
//   });
//   return (
//     <>
//       <MatrixRain></MatrixRain>
//       <div className={styles.blockLoginUser}>
//         <h3 className={styles.textAuth}>Регистрация</h3>
//         <div className={styles.blockFormLogin}>
//           <form onSubmit={formik.handleSubmit}>
//             <input
//               type="hidden"
//               name="csrfmiddlewaretoken"
//               defaultValue="lpEFazWWNuYzEICpRE6DbplHv96mYglw4MmNjo5ZzmSUA0afgh4oTxkqnuUoh0OL"
//             />
//             <div className={styles.blockInput}>
//               <label htmlFor="email">Введите почту</label>
//               <input
//                 id="email"
//                 type="text"
//                 name="email"
//                 value={formik.values.login}
//                 onChange={(e) => formik.setFieldValue("login", e.target.value)}
//               />
//             </div>
//             <div className={styles.blockInput}>
//               <label htmlFor="pass">Введите пароль</label>
//               <input
//                 id="pass"
//                 type="password"
//                 name="pass"
//                 value={formik.values.password}
//                 onChange={(e) =>
//                   formik.setFieldValue("password", e.target.value)
//                 }
//               />
//             </div>
//             <div className={styles.selectRole}>
//               <h3>Ваше имя: "Пользователь"</h3>
//               <p>Возможные имена:</p>
//               <select name="" id="">
//                 <option value="">Пользователь.</option>
//                 <option value="">Десятник.</option>
//                 <option value="">Пятидесятник.</option>
//                 <option value="">Сотник.</option>
//                 <option value="">Тысячник.</option>
//                 <option value="">Десятитысячник.</option>
//                 <option value="">Стотысячник.</option>
//                 <option value="">Миллионник.</option>
//                 <option value="">Судья.</option>
//                 <option value="">Ключник.</option>
//                 <option value="">Безопасность.</option>
//               </select>
//             </div>
//             <div className={styles.politic}>
//               <label htmlFor="politic">
//                 <input
//                   type="checkbox"
//                   id="politic"
//                   defaultValue="Политика конфиденциальности"
//                 />
//                 <a href="#" className={styles.smallText}>
//                   <small>Политика конфиденциальности</small>
//                 </a>
//               </label>
//             </div>
//             <button type="submit" className={styles.btnLogin}>
//               Зарегестрироваться
//             </button>
//           </form>
//           <div className={styles.blockWithTextRegAcc}>
//             <p className={styles.textCreateAcc}>
//               Если уже есть аккаунт, ты можешь авторизоваться
//             </p>
//             <div>
//               <Link href={"/loginPage"} className={styles.smallText}>
//                 <small>Авторизоваться</small>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
