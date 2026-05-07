<script lang="ts">
    import OutputRow from "./OutputRow.svelte";
    import type { History } from "$lib/types/history";

    const { history = [] }: { history?: History[] } = $props();
</script>

<section>
    <ul>
        {#each history as entry ( entry.id )}
            <OutputRow entryText={entry.text} entryType={entry.type} />
        {/each}
    </ul>
</section>

<style>
    section {
        padding: 0.5rem 0.5rem 0 0.5rem;
    }

    section > ul {
        margin: 0;
        padding: 0;
    }
</style>
