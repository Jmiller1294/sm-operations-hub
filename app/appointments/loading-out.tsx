import styles from '../styles/loading.module.css';

const AppointmentsLoadingPage = () => {
  return (
    <p className={styles.loading}>Fetching Appointments....</p>
  )
}

export default AppointmentsLoadingPage;