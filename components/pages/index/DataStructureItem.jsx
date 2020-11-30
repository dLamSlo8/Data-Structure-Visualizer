export default ({ title, img, description }) => {
    return (
        <li>
            <article>
                <h3>{title}</h3>
                {img}
                {description}
            </article>
        </li>
    )
}