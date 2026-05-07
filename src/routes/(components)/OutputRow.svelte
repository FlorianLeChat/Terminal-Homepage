<script lang="ts">
    interface EntryProps {
        entryText: string;
        entryType: string;
    }

    const { entryText, entryType }: EntryProps = $props();
</script>

<li>
    {#if entryType === "input"}
        <span class="prompt-icon">root@ns3086602:/$</span>
    {/if}

    <span class="entry-text">{@html entryText}</span>
</li>

<style>
    li {
        gap: 0.5rem;
        width: 100%;
        margin: 0;
        display: flex;
        padding: 0;
        align-items: center;
    }

    li .prompt-icon {
        color: #00ff00;
    }

    li .entry-text {
        display: inline-block;
        word-break: break-word;
    }
</style>
