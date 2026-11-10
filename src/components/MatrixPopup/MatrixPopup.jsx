import React, { useEffect, useState } from "react";

import { MatrixRain } from "../MatrixRain/MatrixRain";
import "./MatrixPopup.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MatrixPopup = ({ isOpened }) => {
  const [isOpen, setIsOpen] = useState(isOpened);

  useEffect(() => {
    setIsOpen(isOpened);
  }, [isOpened]);
  const router = useRouter();

  return (
    <div className={`overlay ${isOpen ? "overlay_active" : ""}`}>
      <div className="popup">
        <p className="popup__heading">Введите ваш ключ</p>
        <div className="popup__list">
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 1</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 2</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 3</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 4</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 5</p>
          </div>
          <Link
            onClick={() => {
              router.push("/user");
              setIsOpen(false);
            }}
            href="/user"
            className="popup__item"
          >
            <p className="popup__item-heading">Личный кабинет</p>
          </Link>
          <Link href={"/LoginPage"} className="popup__item">
            <p className="popup__item-heading">Ключ 7</p>
          </Link>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 8</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 9</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 10</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 11</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 12</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 13</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 14</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 15</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 16</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 17</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 18</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 19</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 20</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 21</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 22</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 23</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 24</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 25</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 26</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 27</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 28</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 29</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 30</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 31</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 32</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 33</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 34</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 351</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 36</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 37</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 38</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 39</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 40</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 41</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 42</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 43</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 44</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 45</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 46</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 47</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 48</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 49</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 50</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 51</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 52</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 53</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 54</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 55</p>
          </div>
          <div className="popup__item">
            <p className="popup__item-heading">Ключ 56</p>
          </div>
        </div>
      </div>

      <MatrixRain></MatrixRain>
    </div>
  );
};

export default MatrixPopup;
