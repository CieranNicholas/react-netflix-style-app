import "./ErrorPage.scss";

export default function ErrorPage() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className='errorContainer'>
      <p className='errorTitle'>Lost your way?</p>
      <div className='errorContentBody'>
        <p className='errorBody'>
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <button className='errorBtn'>Home</button>

        <div className='errorCode'>
          <p>Error Code: 404</p>
        </div>
      </div>
    </div>
  );
}
