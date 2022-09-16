import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';


describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveData', () => {
    it('null no guarda nada', () => {
      service.saveData("prueba",null);
      expect(localStorage.getItem("prueba")).toBeNull();
    });
    it('Un numero se guarda', () => {
      service.saveData("unnumero", 3);
      expect(localStorage.getItem("unnumero")).toBe("3");
    });
    it('Un objeto se guarda', () => {
      const ob = {
        valor1: "a",
        valor2: 3
      };
      service.saveData("unobjeto", ob);
      expect(localStorage.getItem("unobjeto")).toBe(JSON.stringify(ob));
    });
  });

  describe('getData', () => {
    it('null no guarda ni obtiene nada', () => {
      service.saveData("prueba",null);
      expect(service.getData("prueba")).toBeNull();
    });
    it('Un numero se obtiene en string', () => {
      service.saveData("unnumero", 3);
      expect(service.getData("unnumero")).toBe("3");
    });
    it('Un objeto se obtiene como string si el segundo param es false o no tiene', () => {
      const ob = {
        valor1: "a",
        valor2: 3
      };
      service.saveData("unobjeto", ob);
      expect(typeof service.getData("unobjeto")).toBe("string");
    });
    it('Un objeto se obtiene como objeto si el segundo param es true', () => {
      const ob = {
        valor1: "a",
        valor2: 3
      };
      service.saveData("unobjeto2", ob);
      expect(typeof service.getData("unobjeto2", true)).toBe("object");
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

});
