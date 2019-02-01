const timeout = 15000;

// série de tests sur la page d'accueil
describe("Tests basiques", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('home', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.alwaysdata.net');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/basic-home.png'});
        expect(html).toContain("Polr - Campus Annecy")
    }, timeout);

    // parcours client avec about
    test('link Options', async () => {
        await page.goto('http://polr.alwaysdata.net');
        await page.waitForSelector('#tips');
        // click sur le lien "About" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#show-link-options' ) )
                .filter( el => el.textContent === 'Link Options' )[0].click();
        });
        // on attent que l'élément ".about-contents" soit chargé
        await page.waitForSelector('#link-availability-status');
        // on récupère le code HTML
        await page.$eval( '#check-link-availability', el => el.click() );
        const html = await page.$eval('#check-link-availability', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("Check Availability");
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
