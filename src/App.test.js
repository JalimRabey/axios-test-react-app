import * as axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock out all top level functions, such as get, put, delete and post:
jest.mock('axios');

const mockTarefas = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
];

describe('<App />', () => {
  describe('quando a requisição da API é concluida corretamente', () => {
    test('o componente deve rederizar as tarefas', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: mockTarefas })
      );

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Tarefas' })
        ).toBeInTheDocument();
      });

      expect(
        screen.getByText(`Titulo: ${mockTarefas[0].title}`)
      ).toBeInTheDocument();
    });
  });

  describe('quando a requisição da não API é concluida corretamente', () => {
    test('o componente deve renderizar uma mensagem de erro', async () => {
      axios.get.mockImplementation(() => Promise.reject());
      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Tarefas' })
        ).toBeInTheDocument();
      });

      expect(
        screen.getByRole('heading', { name: 'Tarefas' })
      ).toBeInTheDocument();
    });
  });
});
