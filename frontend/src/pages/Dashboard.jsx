import { useAuth } from '../contexts/AuthContext';
import { Users } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Olá, {user?.name || 'Usuário'}!
      </h1>
      <p className="mt-1 text-gray-500">Bem-vindo ao Bailar CRM 360</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Leads</p>
              <p className="text-2xl font-bold text-gray-800">—</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Use o menu lateral para navegar. A página de <strong>Leads</strong> já está funcional com CRUD completo conectado à API.
        </p>
      </div>
    </div>
  );
}
