export default function BerlinDonerPage() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <title>Berlin Döner – Restaurant Profile</title>
    
        </head>
  
        <body>
          <header>
            <h1>Berlin Döner</h1>
            <p className="stars">★★★★☆ 4.5 / 5</p>
            <address>Mehringdamm 32, 10961 Berlin-Kreuzberg</address>
          </header>
  
          <nav className="tabs">
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#reviews">Reviews</a>
            <a href="#map">Map</a>
          </nav>
  
          <main>
            <section id="about">
              <h2>About</h2>
              <p>Family-run kebab spot famous for its homemade sauces since 1998…</p>
            </section>
  
            <section id="menu">
              <h2>Menu (excerpt)</h2>
              <ul>
                <li>Döner Classic – €5.50</li>
                <li>Veggie Dürüm – €6.00</li>
                <li>Lahmacun Roll – €5.00</li>
              </ul>
            </section>
  
            <section id="reviews">
              <h2>Latest Reviews</h2>
              <article>
                <h3>“Best sauce in town” – Anna K.</h3>
                <p>★★★★★ Very friendly staff…</p>
              </article>
            </section>
  
            <section id="map">
              <h2>Find Us</h2>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?marker=52.4994,13.3911"
                loading="lazy"
                width="100%"
                height="300"
                title="Map"
              ></iframe>
            </section>
          </main>
  
          <footer>&copy; Spot-A-Dönner 2025</footer>
        </body>
      </>
    );
  }
  