describe('Login Test Gestion Hotelera App', () => {

  //se crea el beforeeach para que siempre vaya a visitar a login
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('La pagina principal puede ser abierta', () => {
    cy.contains('Iniciar sesión');
  })

  it('Error al iniciar sesión (formulario vacío)', () => {
    cy.contains('Iniciar sesión').click();
    cy.contains('Error al iniciar sesión');
  })

  it('Error al iniciar sesión (usuario o contraseña incorrecto)', () => {
    cy.get('input#email').first().type('mail.example@mail.es');
    cy.get('input#password').type('password');
    cy.contains('Iniciar sesión').click();
    cy.contains('Error al iniciar sesión');
  })

  it('Inicio de sesión correcto', () => {
    cy.get('input#email').first().type('andresAdmin@gmail.com');
    cy.get('input#password').type('Abcde12345');
    cy.contains('Iniciar sesión').click();
    cy.contains('home works');
  })

  it('No puede acceder a login después de iniciar sesión', () => {
    cy.get('input#email').first().type('andresAdmin@gmail.com');
    cy.get('input#password').type('Abcde12345');
    cy.contains('Iniciar sesión').click();
    cy.contains('home works');
    cy.visit('http://localhost:4200/login')
    cy.contains('Error');
  })

  it('Cerrar sesión', () => {
    cy.get('input#email').first().type('andresAdmin@gmail.com');
    cy.get('input#password').type('Abcde12345');
    cy.contains('Iniciar sesión').click();
    cy.contains('home works');
    cy.get('p-avatar.p-element.ng-star-inserted').click();
    cy.contains('Cerrar Sesión').click();
    cy.contains('Iniciar sesión');

  })

  it('Error al visitar otra ruta sin iniciar sesión', () => {

    cy.visit('http://localhost:4200/home');
    cy.contains('Error');

  })



})