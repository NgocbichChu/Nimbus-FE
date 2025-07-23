import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const footer = () => {
  return (
    <footer className="bg-blue-200 dark:bg-black dark:text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left justify-items-center">
          <div>
            <div className="font-bold text-center text-xl mb-2">PHÒNG KHÁM NIMBUS</div>
            <p>Công Viên Phần Mềm Quang Trung, Quận 12, TPHCM</p>
            <p>
              <span className="font-bold">ĐT</span> : 0898 235 534 - 0388 245 296
            </p>
            <p>
              <span className="font-bold">CSKH</span> : 0325 300 118 - 0379 917 903
            </p>
            <p>
              <span className="font-bold">Email</span> : Nimbus@gmail.com
            </p>
          </div>

          <div>
            <div className="font-bold text-center text-xl mb-2">ĐƯỜNG DẪN HỮU ÍCH</div>
            <p>
              <Link to="/chuyen-gia">Chuyên gia</Link>
            </p>
            <p>
              <Link to="/chuyen-khoa">Chuyên khoa</Link>
            </p>
            <p>
              <Link to="/dat-lich">Đặt lịch</Link>
            </p>
            <p>
              <Link to="/lien-he">Liên hệ</Link>
            </p>
          </div>

          <div>
            <div className="font-bold text-center text-xl mb-2">THEO DÕI CHÚNG TÔI</div>
            <p className="flex justify-center gap-4 ">
              <Link to="#">
                <Icon icon="line-md:facebook" width="24" height="24" />
              </Link>
              <Link to="#">
                <Icon icon="line-md:youtube" width="24" height="24" />
              </Link>
              <Link to="#">
                <Icon icon="line-md:tiktok" width="24" height="24" />{" "}
              </Link>
              <Link to="#">
                <Icon icon="line-md:telegram" width="24" height="24" />{" "}
              </Link>
              <Link to="#">
                <Icon icon="line-md:instagram" width="24" height="24" />{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default footer
