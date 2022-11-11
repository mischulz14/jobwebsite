import Head from 'next/head';
import css from '../components/layout.module.css';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Indeed Jobs</title>
      </Head>
      <div className={css.container}>
        <Header />
        <main className={css.main}>{props.children}</main>
        <footer className={css.footer}>Joie @ Decena</footer>
      </div>
    </>
  );
}