const SectionTitle = ({title}) => {
  return (
    <div className='section-title-div border-b py-10 border-gray-600'>
        <h1 className='section-title-title text-5xl text-center mb-4 max-md:text-6xl max-sm:text-6xl text-accent-content'>{ title }</h1>
    </div>
  )
}

export default SectionTitle