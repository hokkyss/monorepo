import { useBoolean } from '@monorepo/shared/hooks';
import { useSuspenseTodos } from '@monorepo/todo/react';
import { useTranslation } from 'react-i18next';

import { Languages, i18n } from '../../configs/locale/locale.config';
import queryClient from '../../configs/react-query/react-query.config';

import mainRoute from './main.route';
import enTranslations from './translations/en.translation.json';

i18n.addResources(Languages.EN, mainRoute.name, enTranslations);

export default function MainPage() {
  const [val, { toggle }] = useBoolean();
  const todos = useSuspenseTodos({ queryClient: queryClient });
  const [t] = useTranslation('main');

  return (
    <div>
      <h1>
        {t('show-todo')}: {val.toString()}
      </h1>
      <button onClick={toggle}>Toggle</button>
      {val && (
        <ol>
          {todos.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
