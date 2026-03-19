"""ProTest -- real usage example."""

import asyncio
from pathlib import Path
from typing import Annotated

from protest import ProTestSession, fixture, Use, ForEach, From


session = ProTestSession()


@fixture(tags=["io"])
async def workspace(tmp_path: Annotated[Path, Use(tmp_path)]):
    d = tmp_path / "workspace"
    d.mkdir()
    yield d
    # teardown: tmp_path cleanup is automatic


@session.test()
async def test_write_and_read(
    ws: Annotated[Path, Use(workspace)],
):
    f = ws / "hello.txt"
    f.write_text("protest")
    assert f.read_text() == "protest"


FORMATS = ForEach(["json", "yaml", "toml"])


@session.test()
async def test_config_extensions(
    ext: Annotated[str, From(FORMATS)],
    ws: Annotated[Path, Use(workspace)],
):
    config = ws / f"config.{ext}"
    config.touch()
    assert config.suffix == f".{ext}"
