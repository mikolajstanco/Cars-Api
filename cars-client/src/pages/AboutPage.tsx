export default function AboutPage() {
  return (
    <section className="card stack">
      <h1>O aplikacji</h1>
      <p>
        Cars Client to aplikacja React współpracująca z Cars.API. Umożliwia przeglądanie,
        dodawanie i edytowanie samochodów oraz oznaczanie ulubionych aut.
      </p>
      <h2>Konta użytkowników</h2>
      <ul>
        <li>rejestracja z potwierdzeniem adresu e-mail,</li>
        <li>logowanie z wykorzystaniem tokenu JWT dołączanego automatycznie do żądań,</li>
        <li>resetowanie zapomnianego hasła,</li>
        <li>role <strong>User</strong> i <strong>Admin</strong> – usuwanie samochodów jest dostępne tylko dla administratora,</li>
        <li>osobna lista ulubionych samochodów dla każdego użytkownika.</li>
      </ul>
      <h2>Technologie</h2>
      <p>React, React Router, Axios, Zustand, ASP.NET Core, ASP.NET Core Identity, Entity Framework Core.</p>
    </section>
  )
}
