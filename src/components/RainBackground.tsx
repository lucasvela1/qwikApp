import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="rain-bg">
      <Slot />
    </div>
  );
});