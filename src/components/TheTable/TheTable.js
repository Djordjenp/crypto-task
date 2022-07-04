import styles from './TheTable.module.css'

const TheTable = (props) => {

    return (
        <div className={styles.table} style={{gridTemplateColumns: `repeat(${props.headers.length}, minmax(min-content, 1fr))`}}>
            {props.headers.map(header => <h2 key={header} className={styles.table__title}>{header}</h2>)}
            {props.children}
        </div>
    )
}

export default TheTable;