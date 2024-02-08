import { Languages, useTranslation } from '../../configs/locale/locale.config';

import useTodos from './hooks/use-todos.hook';

export default function MainPage() {
  const todos = useTodos();
  const [, setLang] = useTranslation('main');

  return (
    <div>
      {Object.entries(Languages).map(([key, lang]) => (
        <button key={key} onClick={() => setLang(lang)}>
          Change Language to: {lang}
        </button>
      ))}
      {todos.data && (
        <ol data-testid="main:todo-list">
          {todos.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
