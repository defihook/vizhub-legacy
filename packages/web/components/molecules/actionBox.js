export const ActionBox = ({title, children}) => (
  <div
    className='container section'
    style={{maxWidth: '1500px'}}
  >
    <div className='box has-text-centered'>
      <h1 className='title'>{title}</h1>
      { children }
    </div>
  </div>
);
