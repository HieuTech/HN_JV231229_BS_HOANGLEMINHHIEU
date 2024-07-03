import { Button } from "antd";
import { useEffect, useRef } from "react";

export default function Header(prop) {
  const { handleOnChange, errorInput, handleSubmit } = prop;

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <h1 className="text-center text-lg font-semibold my-3">
        Danh sách công việc
      </h1>
      <div>
        <form className="flex items-center " onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="w-[500px] mx-4 h-7 rounded-sm placeholder:px-3"
            placeholder="Nhập
              tên
              công
              việc"
            name="taskName"
            onChange={handleOnChange}
          ></input>
          <Button htmlType="submit" Type type="primary">
            Thêm
          </Button>
        </form>
        {errorInput && (
          <p className="text-red-500">Input Field Is Not Be Empty</p>
        )}
      </div>
    </>
  );
}
