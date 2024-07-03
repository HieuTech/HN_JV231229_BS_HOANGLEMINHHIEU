
export default function Footer(prop) {
  const {  data } = prop;

  //checkCompletedTask

  const checkCompletedTask = () => {
    let numberCompletedTask = 0;
    data.map((task) => {
      if (task.status) {
        numberCompletedTask += 1;
      }
    });
    return numberCompletedTask;
  };
  
  return (
    <>
      <div className="bg-gray-200 rounded-sm my-2">
        <p>
          Công việc đã hoàn thành:
          <span className="font-semibold">
            {checkCompletedTask() === 0 ? 0 : checkCompletedTask()}/{" "}
            {data.length}
          </span>
        </p>
      </div>
    </>
  );
}
