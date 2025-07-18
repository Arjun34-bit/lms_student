<script>
    import { courseTitle } from "../store/courseStore.js"
    export let onConfirm = () => {};
    export let onCancel = () => {};
    </script>

<div class="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
    <div class="bg-white border-lg max-w-2xl p-5 shadow-lg border rounded-lg text-lg">
        <p class="text-black text-center"><i class="pi pi-exclamation-triangle"></i></p>
        <div class="p-3 text-center mt-2 gap-2">
            <p>You are 60% done of {$courseTitle} lecture</p>
            <p>Leaving now might interrupt your learning.</p>
        </div>
        <div class="mt-2 flex justify-end gap-2">
            <button class="bg-white text-black px-2 border rounded-sm cursor-pointer"  on:click={onCancel}>
                Resume Watching
            </button>
            <button class="bg-black text-white px-2 border rounded-sm cursor-pointer" on:click={onConfirm}>
                Exit Anyway
            </button>
        </div>
    </div>
</div>