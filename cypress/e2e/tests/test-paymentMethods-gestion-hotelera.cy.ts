describe('Company Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
    });


  
    it('Registrar método de pago', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Metodos de pago').dblclick();
        cy.contains('Agregar método').click();
        //se llena formulario

        cy.get('input').first().type('Método prueba');
        cy.get('button[name="buttonRegisterPaymentMethod"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar métodos de pago
        cy.contains('Registro metodo de pago');
        cy.contains('Método prueba');

    })
    


    it('Listar métodos de pago', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Metodos de pago').dblclick();
        cy.contains('Listar métodos').click();
        cy.contains('Métodos de pago Registrados');
    })

    it('Actualizar método de pago', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Metodos de pago').dblclick();
        cy.contains('Listar métodos').click();
        cy.contains('Métodos de pago Registrados');
        cy.get('button[name="buttonUpdatePaymentMethod"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Método de pago');
        cy.get('input').first().type('{selectAll}Metodo Nuevo');
        cy.get('button[name="buttonUpdatePaymentMethod"]').should('be.enabled').click();

        //volvemos a list paymentMethods
        cy.contains('Actualizar método de pago')
        cy.contains('Metodo Nuevo');

    })
    
    it('Eliminar método de pago', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Metodos de pago').dblclick();
        cy.contains('Listar métodos').click();
        cy.contains('Métodos de pago Registrados');
        cy.get('button[name="buttonDeletePaymentMethod"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Método de pago eliminado correctamente');

    })
    
    

})