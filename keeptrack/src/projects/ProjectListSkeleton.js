import ProjectCardSkeleton from './ProjectCardSkeleton'

const ProjectListSkeleton = () => {
    const numberOfItems = Array.from({length: 10}, (x, i) => i + 1)
    console.log(numberOfItems)
    const items = numberOfItems.map((item) => (
        <ProjectCardSkeleton key={item} />
    ))
    console.log(items)

    return <div className='row'>{items}</div>;
}

export default ProjectListSkeleton