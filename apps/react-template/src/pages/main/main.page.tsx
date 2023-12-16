import { useBoolean } from '@monorepo/shared/react/hooks';
import { useSuspenseTodos } from '@monorepo/todo/react';

import { Languages, i18n, useTranslation } from '../../configs/locale/locale.config';
import queryClient from '../../configs/react-query/react-query.config';

export default function MainPage() {
  const [val, { toggle }] = useBoolean();
  const todos = useSuspenseTodos({ queryClient });
  const t = useTranslation('main');

  return (
    <div>
      {Object.entries(Languages).map(([key, lang]) => (
        <button key={key} onClick={() => i18n.changeLanguage(lang)}>
          Change Language to: {lang}
        </button>
      ))}
      <h1>{t('show-todo', { shown: val })}</h1>
      <button data-testid="main:toggle-todo-list" onClick={toggle}>
        Toggle
      </button>
      {val && (
        <ol data-testid="main:todo-list">
          {todos.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
