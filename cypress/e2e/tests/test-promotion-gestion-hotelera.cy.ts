describe('Company Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
    });


  
    it('Registrar promoción', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Promociones').dblclick();
        cy.contains('Registrar promoción').click();
        //se llena formulario
        cy.get('input[formcontrolname="description"').type('Promoción Prueba');
        cy.get('input[placeholder="Fecha"]').type('01/12/2023');
        cy.get('input[placeholder="Ej. 5"]').type('5');
        cy.get('select[formcontrolname="companyId"]').select('Seguros Bolivar');
        cy.get('button[name="buttonRegisterPromotion"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar empresas
        cy.contains('Registro promoción');
        cy.contains('Promoción Prueba');
        cy.contains('Seguros Bolivar');

    })
    


    it('Listar promociones', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Promociones').dblclick();
        cy.contains('Listar promociones').click();
        cy.contains('Promociones Registradas');
    })

    it('Actualizar promoción', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Promociones').dblclick();
        cy.contains('Listar promociones').click();
        cy.contains('Promociones Registradas');
        cy.get('button[name="buttonUpdatePromotion"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Promoción');
        cy.get('input[formcontrolname="description"').type('{selectAll}Promoción Nueva');
        cy.get('input[placeholder="Fecha"]').type('{selectAll}02/12/2023');
        cy.get('input[placeholder="Ej. 5"]').type('{selectAll}5');
        cy.get('button[name="buttonUpdatePromotion"]').should('be.enabled').click();

        //volvemos a list companies
        cy.contains('Actualziar promoción')
        cy.contains('Promoción Nueva');
        cy.contains('Seguros Bolivar');

    })
    
    it('Eliminar promoción', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Promociones').dblclick();
        cy.contains('Listar promociones').click();
        cy.contains('Promociones Registradas');
        cy.get('button[name="buttonDeletePromotion"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Promoción eliminada correctamente');

    })
    
    

})