import React, { useState, useEffect } from 'react';

import { RadioGroup } from '@headlessui/react';
import { FaMotorcycle, FaCarAlt, FaTruck } from 'react-icons/fa';

import api from '../api/api';
import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { HeroHeaderPage } from '../hero/HeroHeaderPage';
import { VerticalFeatures } from './VerticalFeatures';

interface MarcaData {
  codigo: string;
  nome: string;
}

interface Fipe {
  // [x: string]: any;
  AnoModelo: number;
  CodigoFipe: string;
  Combustivel: string;
  Marca: string;
  MesReferencia: string;
  Modelo: string;
  SiglaCombustivel: string;
  TipoVeiculo: number;
  Valor: string;
}

const Vehicle = {
  models: [
    { name: 'CARROS', value: 'carros', icon: FaCarAlt },
    { name: 'MOTOS', value: 'motos', icon: FaMotorcycle },
    { name: 'CAMINHOES', value: 'caminhoes', icon: FaTruck },
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const Hero = () => {
  const [veiculos, setVeiculos] = useState('');
  const [resVeiculos, setResVeiculos] = useState<MarcaData[]>([]);

  const [marcas, setMarcas] = useState('');
  const [resMarcas, setResMarcas] = useState<MarcaData[]>([]);

  const [modelos, setModelos] = useState('');
  const [resModelos, setResModelos] = useState<MarcaData[]>([]);

  const [anos, setAnos] = useState('');
  const [resAnos, setResAnos] = useState<Fipe[] | []>();

  useEffect(() => {
    async function getVeiculos() {
      if (veiculos === '') {
        return;
      }
      const response = await api.get(
        `https://parallelum.com.br/fipe/api/v1/${veiculos}/marcas`
      );
      setResVeiculos(response.data);
      setResMarcas([]);
      setResModelos([]);
      setResAnos([]);
    }

    getVeiculos();
  }, [veiculos]);

  useEffect(() => {
    async function getMarcas() {
      if (marcas === '') {
        return;
      }
      const response = await api.get(
        `https://parallelum.com.br/fipe/api/v1/${veiculos}/marcas/${marcas}/modelos`
      );
      setResMarcas(response.data.modelos);
      setResModelos([]);
      setResAnos([]);
    }
    getMarcas();
  }, [marcas]);

  useEffect(() => {
    async function getModelos() {
      if (modelos === '') {
        return;
      }
      const response = await api.get(
        `https://parallelum.com.br/fipe/api/v1/${veiculos}/marcas/${marcas}/modelos/${modelos}/anos`
      );
      setResModelos(response.data);
    }
    getModelos();
    setResAnos([]);
  }, [modelos]);

  useEffect(() => {
    async function getAnos() {
      if (anos === '') {
        return;
      }
      const response = await api.get(
        `https://parallelum.com.br/fipe/api/v1/${veiculos}/marcas/${marcas}/modelos/${modelos}/anos/${anos}`
      );
      setResAnos(response.data);
    }
    getAnos();
  }, [anos]);

  // function setFavorite(vehicle: Fipe) {
  //   const dateLocal = localStorage.CarrosFavoritos;
  //   if (dateLocal !== undefined) {
  //     const newVehicle = JSON.parse(dateLocal);
  //     newVehicle.push(vehicle);
  //     localStorage.CarrosFavoritos = JSON.stringify(newVehicle);
  //   } else {
  //     const CarrosFavoritos = [vehicle];
  //     localStorage.CarrosFavoritos = JSON.stringify(CarrosFavoritos);
  //   }
  //   window.alert(
  //     `Veiculo ( ${vehicle.Modelo} ) Salvo na lista de favoritos!!
  //     Acesse a Lista de veículos favoritos clicando em favoritos no menu.`
  //   );
  // }

  // const handleButtonClick = () => {
  //   setVeiculos('');
  //   setResVeiculos([]);

  //   setMarcas('');
  //   setResMarcas([]);

  //   setModelos('');
  //   setResModelos([]);

  //   setAnos('');
  //   setResAnos('');
  // };

  return (
    <>
      <div className="relative bg-gray-50 overflow-hidden">
        <VerticalFeatureRow />
        <div className="relative pt-6 pb-16 md:pb-24">
          <VerticalFeatures />

          <main className="mt-16 mx-auto max-w-5xl px-4 md:mt-24">
            <div className="text-center">
              <HeroHeaderPage />

              <div className="mt-8 max-w-7xl mx-auto md:justify-center md:mt-10">
                <div className="mt-8">
                  <div className="flex items-center justify-center">
                    <h2 className="text-md font-medium text-gray-900">
                      Selecione o tipo do veiculo
                    </h2>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-2"
                    >
                      Limpar opções
                    </a> */}
                  </div>

                  <RadioGroup onChange={(e) => setVeiculos(e)} value={veiculos}>
                    <div className="grid grid-cols-3 gap-3 md:grid-cols-3 mt-3">
                      {Vehicle.models.map((size) => (
                        <RadioGroup.Option
                          key={size.value}
                          value={size.value}
                          className={({ active, checked }) =>
                            classNames(
                              // size.inStock
                              //   ? 'cursor-pointer focus:outline-none'
                              //   : 'opacity-25 cursor-not-allowed',
                              active
                                ? 'ring-2 ring-offset-2 ring-indigo-500 bg-indigo-600 border-transparent hover:bg-indigo-700'
                                : '',
                              checked
                                ? 'bg-indigo-600 border-transparent hover:bg-indigo-700'
                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-200',
                              'cursor-pointer border rounded-md py-3 px-3 sm:flex-1 text-sm text-white md:text-lg'
                            )
                          }
                          // disabled={!size.inStock}
                        >
                          <size.icon
                            className="mx-auto h-6 w-6 flex-shrink-0"
                            aria-hidden="true"
                          />

                          <RadioGroup.Label as="p">
                            {size.value}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <form className="max-w-3xl mx-auto md:justify-center md:mt-8">
                  <div className="w-full max-w-xl flex-col mx-auto">
                    <div className="mt-10 w-full max-w-3xl">
                      <label
                        htmlFor="currency"
                        className={
                          resVeiculos.length
                            ? 'text-lg font-medium text-indigo-600'
                            : 'block text-base font-medium text-gray-700'
                        }
                      >
                        Marcas
                      </label>
                      <div className="mt-1.5 relative">
                        <select
                          name="marca"
                          id="marca"
                          className={
                            resVeiculos.length
                              ? 'cursor-pointer hover:bg-indigo-50 appearance-none block w-full bg-none bg-white border border-indigo-600 rounded-md pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                              : 'appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          }
                          onChange={(e) => setMarcas(e.target.value)}
                          value={marcas}
                          disabled={!resVeiculos.length}
                        >
                          <option value="marca">Selecione a marca</option>

                          {resVeiculos.map((marca: MarcaData) => (
                            <option key={marca.codigo} value={marca.codigo}>
                              {marca.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-10 w-full max-w-3xl">
                      <label
                        htmlFor="currency"
                        className={
                          resMarcas.length
                            ? 'text-lg font-medium text-indigo-600'
                            : 'block text-base font-medium text-gray-700'
                        }
                      >
                        Modelos
                      </label>
                      <div className="mt-1.5 relative">
                        <select
                          name="modelo"
                          id="modelo"
                          className={
                            resMarcas.length
                              ? 'cursor-pointer hover:bg-indigo-50 appearance-none block w-full bg-none bg-white border border-indigo-600 rounded-md pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                              : 'appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          }
                          onChange={(e) => setModelos(e.target.value)}
                          value={modelos}
                          disabled={!resMarcas.length}
                        >
                          <option value="modelo">Selecione o modelo</option>

                          {resMarcas.map((modelo: MarcaData) => (
                            <option key={modelo.codigo} value={modelo.codigo}>
                              {modelo.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-10 w-full max-w-3xl">
                      <label
                        htmlFor="currency"
                        className={
                          resModelos.length
                            ? 'text-lg font-medium text-indigo-600'
                            : 'block text-base font-medium text-gray-700'
                        }
                      >
                        Ano
                      </label>
                      <div className="mt-1.5 relative">
                        <select
                          name="ano"
                          id="ano"
                          className={
                            resModelos.length
                              ? 'cursor-pointer hover:bg-indigo-50 appearance-none block w-full bg-none bg-white border border-indigo-600 rounded-md pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                              : 'appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          }
                          onChange={(e) => setAnos(e.target.value)}
                          value={anos}
                          disabled={!resModelos.length}
                        >
                          <option value="ano">Selecione um Ano</option>

                          {resModelos.map((ano: MarcaData) => (
                            <option key={ano.codigo} value={ano.codigo}>
                              {ano.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {!!resAnos && (
                <div className="mt-8 lg:col-span-5">
                  <section aria-labelledby="policies-heading" className="mt-10">
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                      {Object.entries(resAnos).map(
                        (res: any, index: number) => (
                          <div
                            key={`${res[0]}-${index}`}
                            className="bg-gray-200 border-transparent hover:bg-indigo-100 rounded-lg p-6 text-center"
                          >
                            <dt>
                              <span className="mt-4 text-base font-medium text-gray-700">
                                {res[0]}
                              </span>
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900">
                              {res[1]}
                            </dd>
                          </div>
                        )
                      )}
                    </dl>
                  </section>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
